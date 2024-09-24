export const notebooks: Record<
  string,
  { label: string; text: string; image: string; defaultUrl: string }
> = {
  minimal: {
    label: 'Minimal',
    text: 'Basic command-line tools useful when working in Jupyter applications',
    image: 'docker.io/jupyter/minimal-notebook:latest',
    defaultUrl: '/lab'
  },
  scipy: {
    label: 'Scipy',
    text: 'Popular packages from the scientific Python ecosystem',
    image: 'docker.io/jupyter/scipy-notebook:latest',
    defaultUrl: '/lab'
  },
  r: {
    label: 'R',
    text: 'Popular packages from the R ecosystem',
    image: 'docker.io/jupyter/r-notebook:latest',
    defaultUrl: '/lab'
  },
  datascience: {
    label: 'Datascience',
    text: 'Libraries for data analysis from the Julia, Python, and R communities',
    image: 'docker.io/jupyter/datascience-notebook:latest',
    defaultUrl: '/lab'
  },
  allspark: {
    label: 'Spark',
    text: 'Python and R support for Apache Spark',
    image: 'docker.io/jupyter/all-spark-notebook:latest',
    defaultUrl: '/lab'
  },
  rstudio: {
    label: 'RStudio',
    text: 'Run RStudio in a jupyter notebook',
    image: 'harbor.computational.bio.uni-giessen.de/jhaas-notebooks/rstudio:master',
    defaultUrl: '/rstudio'
  },
  custom: {
    label: 'Custom',
    text: 'Deploy your custom notebook configuration:',
    image: 'docker.io/jupyter/base-notebook:latest',
    defaultUrl: '/lab'
  }
};
