import type { ImageMetadata } from 'astro';
import unity from '../assets/tools/unity.png';
import unreal from '../assets/tools/unreal.png';
import houdini from '../assets/tools/houdini.png';
import nuke from '../assets/tools/nuke.png';
import opengl from '../assets/tools/opengl.svg';
import afterEffects from '../assets/tools/after-effects.png';
import premierePro from '../assets/tools/premiere-pro.png';
import cpp from '../assets/tools/cpp.svg';
import cppDark from '../assets/tools/cpp-dark.svg';
import python from '../assets/tools/python.svg';
import react from '../assets/tools/react.svg';
import threejs from '../assets/tools/threejs.svg';
import threejsDark from '../assets/tools/threejs-dark.svg';
import typescript from '../assets/tools/typescript.svg';
import javascript from '../assets/tools/javascript.svg';
import nextjs from '../assets/tools/nextjs.svg';
import nextjsDark from '../assets/tools/nextjs-dark.svg';
import fastapi from '../assets/tools/fastapi.svg';
import docker from '../assets/tools/docker.svg';
import githubActions from '../assets/tools/github-actions.svg';
import opencv from '../assets/tools/opencv.svg';
import opencvDark from '../assets/tools/opencv-dark.svg';
import pytorch from '../assets/tools/pytorch.svg';
import ffmpeg from '../assets/tools/ffmpeg.svg';
import numpy from '../assets/tools/numpy.svg';
import numpyDark from '../assets/tools/numpy-dark.svg';
import pandas from '../assets/tools/pandas.svg';
import pandasDark from '../assets/tools/pandas-dark.svg';
import scikitLearn from '../assets/tools/scikit-learn.svg';
import nodejs from '../assets/tools/nodejs.svg';
import blender from '../assets/tools/blender.svg';
import nvidia from '../assets/tools/nvidia.svg';
import git from '../assets/tools/git.svg';
import sqlite from '../assets/tools/sqlite.svg';
import sqliteDark from '../assets/tools/sqlite-dark.svg';
import webgl from '../assets/tools/webgl.svg';
import webglDark from '../assets/tools/webgl-dark.svg';
import algorithm from '../assets/logos/algorithm.png';
import ddb from '../assets/logos/3ddb.png';
import trinity from '../assets/logos/trinity.png';
import beyonity from '../assets/logos/beyonity.svg';
import buwog from '../assets/logos/buwog.png';
import jlr from '../assets/logos/jlr.svg';
import jlrDark from '../assets/logos/jlr-dark.svg';
import tui from '../assets/logos/tui.svg';
import github from '../assets/social/github.png';
import linkedin from '../assets/social/linkedin.png';
import artstation from '../assets/social/artstation.png';
import vimeo from '../assets/social/vimeo.png';
import vsco from '../assets/social/vsco.png';
import unityDark from '../assets/tools/unity-dark.png';
import unrealDark from '../assets/tools/unreal-dark.png';
import algorithmDark from '../assets/logos/algorithm-dark.png';
import ddbDark from '../assets/logos/3ddb-dark.png';
import trinityDark from '../assets/logos/trinity-dark.png';
import beyonityDark from '../assets/logos/beyonity-dark.svg';
import buwogDark from '../assets/logos/buwog-dark.png';
import githubDark from '../assets/social/github-dark.png';
import linkedinDark from '../assets/social/linkedin-dark.png';
import artstationDark from '../assets/social/artstation-dark.png';
import vimeoDark from '../assets/social/vimeo-dark.png';
import vscoDark from '../assets/social/vsco-dark.png';
import instagram from '../assets/social/instagram.svg';
import instagramDark from '../assets/social/instagram-dark.svg';

export interface Icon {
  src: ImageMetadata;
  /** Light-on-transparent version shown in dark mode (for dark artwork). */
  dark?: ImageMetadata;
}

/** Tool icons, matched against stack / keyword names (case-insensitive "starts with"). */
const tools: [prefix: string, icon: Icon][] = [
  ['unreal', { src: unreal, dark: unrealDark }],
  ['unity', { src: unity, dark: unityDark }],
  ['houdini', { src: houdini }],
  ['nuke', { src: nuke }],
  ['opengl', { src: opengl }],
  ['webgl', { src: webgl, dark: webglDark }],
  ['after effects', { src: afterEffects }],
  ['adobe after effects', { src: afterEffects }],
  ['premiere', { src: premierePro }],
  ['adobe premiere', { src: premierePro }],
  ['blender', { src: blender }],
  ['nvidia', { src: nvidia }],
  ['c++', { src: cpp, dark: cppDark }],
  ['python', { src: python }],
  ['react', { src: react }],
  ['three.js', { src: threejs, dark: threejsDark }],
  ['threejs', { src: threejs, dark: threejsDark }],
  ['typescript', { src: typescript }],
  ['javascript', { src: javascript }],
  ['next.js', { src: nextjs, dark: nextjsDark }],
  ['fastapi', { src: fastapi }],
  ['docker', { src: docker }],
  ['github actions', { src: githubActions }],
  ['opencv', { src: opencv, dark: opencvDark }],
  ['pytorch', { src: pytorch }],
  ['torchvision', { src: pytorch }],
  ['ffmpeg', { src: ffmpeg }],
  ['numpy', { src: numpy, dark: numpyDark }],
  ['pandas', { src: pandas, dark: pandasDark }],
  ['scikit', { src: scikitLearn }],
  ['node', { src: nodejs }],
  ['git', { src: git }],
  ['sqlite', { src: sqlite, dark: sqliteDark }],
];

export function toolIcon(name: string): Icon | undefined {
  const n = name.trim().toLowerCase();
  return tools.find(([prefix]) => n.startsWith(prefix))?.[1];
}

/** Organisation logos for the experience timeline. */
export interface Logo { src: ImageMetadata; dark?: ImageMetadata; alt: string }

export const logos = {
  jlr: { src: jlr, dark: jlrDark, alt: 'JLR' },
  tui: { src: tui, alt: 'TUI' },
  algorithm: { src: algorithm, dark: algorithmDark, alt: 'Algorithm' },
  '3ddb': { src: ddb, dark: ddbDark, alt: '3D Design Bureau' },
  trinity: { src: trinity, dark: trinityDark, alt: 'Trinity College Dublin' },
  beyonity: { src: beyonity, dark: beyonityDark, alt: 'Beyonity' },
  buwog: { src: buwog, dark: buwogDark, alt: 'BUWOG Group' },
} satisfies Record<string, Logo>;

export type LogoId = keyof typeof logos;

/** Social icons, keyed like site.links. */
export const social: Record<string, { src: ImageMetadata; dark?: ImageMetadata; label: string }> = {
  linkedin: { src: linkedin, dark: linkedinDark, label: 'LinkedIn' },
  github: { src: github, dark: githubDark, label: 'GitHub' },
  artstation: { src: artstation, dark: artstationDark, label: 'ArtStation' },
  instagram: { src: instagram, dark: instagramDark, label: 'Instagram' },
  vimeo: { src: vimeo, dark: vimeoDark, label: 'Vimeo' },
  vsco: { src: vsco, dark: vscoDark, label: 'VSCO' },
};
