export function getFromStorage(key?: string): string {
  if (!key) {
    return '';
  }
  const storageData = localStorage.getItem(key);
  return storageData ?? '';
}

export function setToStorage(key: string, value: string): void {
  if (!key) {
    return;
  }
  localStorage.setItem(key, value);
}
