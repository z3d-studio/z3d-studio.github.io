import React from 'react';
import Head from 'next/head';

import { WithStyles, withStyles } from '@material-ui/core/styles';

import Header from '~/components/Header';
import ProjectList from '~/components/ProjectList';

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

export const getStaticProps = async () => {
  const files = await getFiles();
  const loadedFiles = await Promise.all(files.map(loadFile));

  const projects = loadedFiles.map(({ metadata }) => ({
    title: metadata.title,
    slug: metadata.slug,
    image: metadata.images.find((image) => image.main) || metadata.images[0],
  }));

  return { props: { projects } };
};

interface Props extends WithStyles {
  projects: any[];
}

export const PortifolioPage: React.FC<Props> = ({ projects, classes }) => (
  <>
    <Head>
      <title>Z3D Studio - Portifolio</title>
    </Head>
    <Header />
    <div className={classes.content}>
      <ProjectList projects={projects} />
    </div>
  </>
);

export default withStyles((theme) => ({
  content: {
    position: 'fixed',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    width: '100%',
    top: '64px',
    height: `calc(100vh - 64px)`,
  },
}))(PortifolioPage);
