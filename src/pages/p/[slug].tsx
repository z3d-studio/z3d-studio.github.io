import { GetStaticPaths } from 'next';
import React from 'react';

const generateBasePath = () => `${process.cwd()}/src/content/projects`;
const getFiles = async () => {
  const fs = await import('fs');
  const { promisify } = await import('util');

  const readDir = promisify(fs.readdir);

  const rootPath = generateBasePath();
  const dirs = await readDir(rootPath);

  return await Promise.all(
    dirs.map((dir) => readDir(`${rootPath}/${dir}`))
  ).then((files) => {
    return files.map((file, idx) => `${rootPath}/${dirs[idx]}/${file}`);
  });
};

const loadFile = async (filePath) => {
  const { default: mdParser } = await import('markdown-yaml-metadata-parser');
  const fs = await import('fs');

  const text = fs.readFileSync(filePath, 'utf-8');

  return mdParser(text);
};

export const getStaticProps = async ({ params }) => {
  const files = await getFiles();
  const loadedFiles = await Promise.all(files.map(loadFile));

  const mdProps = loadedFiles.find(
    (markdown) => markdown.metadata.slug === params.slug
  );

  return { props: mdProps };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const files = await getFiles();

  const pathMap = locales
    .map((locale) =>
      files
        .filter((file) => file.indexOf(locale) > -1)
        .map((file) =>
          loadFile(file).then(({ metadata }) => ({
            params: { slug: metadata.slug },
            locale,
          }))
        )
    )
    .reduce((acc, cur) => [...acc, ...cur]);

  const paths = await Promise.all(pathMap);

  return { paths, fallback: false };
};

export const ProjectPage = ({ content, metadata }) => (
  <div>
    <h1>{metadata.title}</h1>
    {metadata.tags.map((tag) => (
      <span key={tag}>#{tag}</span>
    ))}
    <div dangerouslySetInnerHTML={{ __html: content }} />
    <div>
      {metadata.images.map(({ link, label }) => (
        <img key={link} src={link} alt={label} />
      ))}
    </div>
  </div>
);

export default ProjectPage;
