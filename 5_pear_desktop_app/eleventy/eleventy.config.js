export default async function (eleventyConfig) {
  // copy js files to output
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addWatchTarget('src/js');
}

export const config = {
  dir: {
    input: 'src',
  },
  markdownTemplateEngine: 'liquid',
  formats: ['md', 'liquid', 'html'],
};
