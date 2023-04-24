import type { JupyterBase } from '@/models/jupyter.model';

export function sortByCreationTime(a: JupyterBase, b: JupyterBase) {
  return b.createdAt.getTime() - a.createdAt.getTime();
}

export function sortByStartTime(a: JupyterBase, b: JupyterBase) {
  return b.startDate.getTime() - a.startDate.getTime();
}

export function sortByEndTime(a: JupyterBase, b: JupyterBase) {
  return b.endDate.getTime() - a.endDate.getTime();
}

export function sortByName(a: JupyterBase, b: JupyterBase) {
  return a.name.localeCompare(b.name);
}

export function sortBySlug(a: JupyterBase, b: JupyterBase) {
  return a.slug.localeCompare(b.slug);
}
