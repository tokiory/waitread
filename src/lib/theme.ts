export const toggleTheme = (state: 'dark' | 'light') => {
  const classList = document.documentElement.classList;

  if (state === 'dark') {
    classList.add('dark');
    classList.remove('light');
  } else {
    classList.remove('dark');
    classList.add('light');
  }
}

export const getTheme = () => {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
