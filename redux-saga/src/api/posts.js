const sleep = n => new Promise(resolve => setTimeout(resolve, n));

const posts = [
  { id: 1, title: 'test1', body: 'testtestet1' },
  { id: 2, title: 'test2', body: 'testtestet2' },
  { id: 3, title: 'test3', body: 'testtestet3' },
  { id: 4, title: 'test4', body: 'testtestet4' },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async id => {
  await sleep(500);
  return posts.find(post => post.id === id);
};
