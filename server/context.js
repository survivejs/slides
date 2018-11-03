const fs = require("fs");
const path = require("path");
const { merge } = require("lodash");
const simpleGit = require("simple-git/promise")(path.join(__dirname, ".."));
const cloudinary = require("cloudinary");
const Promise = require("bluebird");
const themes = require("./themes");
const presentations = require("./presentations");
const { saveYAML } = require("./utils");

const cloudinaryAssetPath = path.join(
  __dirname,
  "..",
  "cloudinary-assets.json"
);
const cloudinaryAssets = require(cloudinaryAssetPath);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

function getTheme(id) {
  return themes[id];
}
function getThemes() {
  return Object.values(themes);
}

function updateSlideContent({ slideIndex, presentationID, content }) {
  const presentation = getField("presentation", presentations, presentationID);
  const oldSlides = presentation.slides;
  const oldSlide = oldSlides[slideIndex];
  const newSlide = merge({}, oldSlide, { content });
  const newSlides = oldSlides
    .slice(0, slideIndex)
    .concat(newSlide)
    .concat(oldSlides.slice(slideIndex + 1));

  updatePresentationFile(presentationID, newSlides);

  // TODO: What to return?
  return { content: newSlide.content, gitDiff: gitDiff() };
}
function changePresentationTheme({ presentationID, themeID }) {
  const presentation = getField("presentation", presentations, presentationID);
  const theme = getField("theme", themes, themeID);
  const oldSlides = presentation.slides;
  const newSlides = [{ ...oldSlides[0], theme: themeID }].concat(
    oldSlides.slice(1)
  );

  updatePresentationFile(presentationID, newSlides);

  return { theme, gitDiff: gitDiff() };
}
function getField(type, record, id) {
  const result = record[id];

  if (!result) {
    throw new Error(`No ${type} found using ${id}`);
  }

  return result;
}

function updatePresentationFile(presentationID, slides) {
  saveYAML(
    path.resolve(__dirname, "presentations", `${presentationID}.yaml`),
    slides
  );
}

async function getPresentations() {
  return await Object.keys(presentations).map(getPresentation);
}
async function getPresentation(id) {
  const presentation = presentations[id];

  return {
    ...presentation,
    // TODO: Assumes only the first slide contains theme reference
    slides: await Promise.map(resolveToC(presentation.slides), async slide => ({
      ...slide,
      background: await resolveImage(slide.background),
      theme: presentation.slides[0].theme
    }))
      .map(resolveTheme)
      .filter(({ skip }) => !skip)
  };
}
function resolveToC(slides) {
  const sections = slides
    .filter(({ layout }) => layout === "section")
    .map(({ content: { title } }) => title);

  return slides.map(slide => {
    if (slide.layout === "toc") {
      return {
        ...slide,
        layout: "markdown",
        content: {
          ...slide.content,
          markup: toMarkdownList(sections)
        }
      };
    }

    if (slide.layout === "image") {
      return {
        ...slide,
        content: resolveImage(slide.content)
      };
    }

    return slide;
  });
}
function toMarkdownList(items) {
  return items.map(item => `* ${item}`).join("\n");
}

async function resolveImage(image) {
  if (!image || !image.asset) {
    return Promise.resolve(image);
  }

  const asset = image.asset;
  let assetPath = path.resolve(__dirname, "..", asset);
  let id;

  if (fs.existsSync(assetPath)) {
    id = path.basename(asset, path.extname(asset));
  } else {
    assetPath = asset;
    id = asset.split("?")[0].replace(/\//g, "-");
  }

  let uploadedAsset;

  // TODO: Figure out if the files have changed and need an update
  // (md5 content)
  if (cloudinaryAssets[id]) {
    return {
      ...image,
      asset: cloudinaryAssets[id]
    };
  }

  try {
    uploadedAsset = await cloudinary.v2.uploader.upload(assetPath, {
      overwrite: true,
      public_id: id
    });
  } catch (err) {
    throw new Error(err.message);
  }

  const secureUrl = uploadedAsset.secure_url;
  cloudinaryAssets[id] = secureUrl;
  fs.writeFileSync(
    cloudinaryAssetPath,
    JSON.stringify(cloudinaryAssets, null, 2),
    {
      encoding: "utf8"
    }
  );

  return {
    ...image,
    asset: secureUrl
  };
}

const resolveTheme = resolveField("theme", themes);

function resolveField(field, lookup) {
  return entity => ({
    ...entity,
    [field]: lookup[entity[field]]
  });
}

function gitDiff() {
  return simpleGit.diff().then(result =>
    result
      .split("\n")
      .filter(line => !line.startsWith("diff "))
      .join("\n")
  );
}

module.exports = {
  gitDiff,
  updateSlideContent,
  changePresentationTheme,
  getTheme,
  getThemes,
  getPresentation,
  getPresentations
};
