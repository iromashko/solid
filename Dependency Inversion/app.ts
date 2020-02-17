import * as fs from 'fs';

export interface Post {
  id: number;
  title: string;
  body: string;
  postBy: string;
}

export interface IPostService {
  getAll(): Promise<Post[]>;
  save(post: Post): Promise<void>;
}

export class PostsService implements IPostService {
  private _fileName: string = 'posts.json';

  constructor() {}

  getAll(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this._fileName, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(data));
      });
    });
  }
  save(post: Post): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getAll().then(posts => {
        posts.push(post);
        fs.writeFile(this._fileName, posts, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }
}

export class MockPostsService implements IPostService {
  posts: Post[] = [];
  constructor() {
    this.posts = [
      { id: 1, title: 'Title 1', body: 'body 1', postBy: 'me' },
      { id: 2, title: 'Title 2', body: 'body 2', postBy: 'me' },
      { id: 3, title: 'Title 3', body: 'body 3', postBy: 'me' },
      { id: 4, title: 'Title 4', body: 'body 4', postBy: 'me' },
      { id: 5, title: 'Title 5', body: 'body 5', postBy: 'me' }
    ];
  }
  getAll(): Promise<Post[]> {
    return Promise.resolve(this.posts);
  }
  save(post: Post): Promise<void> {
    this.posts.push(post);
    return Promise.resolve();
  }
}

export class NewsFeed {
  constructor(private _service: IPostService) {}

  show() {
    this._service.getAll().then(posts => {
      posts.forEach(post => {
        console.log(`${post.title} - ${post.body}`);
      });
    });
  }
}

let newsFeed = new NewsFeed(new MockPostsService());
newsFeed.show();
