import React from 'react';
import Head from 'next/head';

import { withStyles } from '@material-ui/core/styles';
import { GetStaticPaths } from 'next';

import Header from '~/components/Header';
import Frame from '~/components/Frame';
import PortifolioContent from '~/components/PortifolioContent';

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

export const ProjectPage = ({ content, metadata, classes }) => (
  <>
    <Head>
      <title>Z3D Studio - {metadata.title}</title>
    </Head>
    <Header />
    <div className={classes.content}>
      <Frame images={metadata.images} />
      <PortifolioContent
        tags={metadata.tags}
        title={metadata.title}
        content={content}
      />
    </div>
  </>
);

export default withStyles((theme) => ({
  content: {
    position: 'fixed',
    display: 'grid',
    gridTemplateColumns: '65% auto',
    width: '100%',
    top: theme.mixins.toolbar.minHeight,
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  },
}))(ProjectPage);
