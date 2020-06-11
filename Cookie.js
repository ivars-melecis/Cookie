class Cookie {
  constructor() {
    this.expDays = 'Thu, 01 Jan 1970 00:00:00 GMT';

    // Bind this
    this.fetch = this.fetch.bind(this);
    this.add = this.add.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);

    this.formatted = this.fetch();
  }

  fetch() {
    let cookies = document.cookie.split(';');
    let result = [];

    cookies.forEach((cookie) => {
      let src = cookie.trim();

      // Name
      let cookieName = src.split('=')[0];

      // Content
      let cookieContent = src.split('=');
      cookieContent.shift();
      cookieContent = cookieContent.join('=');

      // let cookie formatting
      let formatted = {
        name: cookieName,
        content: cookieContent,
      };

      result.push(formatted);
    });

    return result;
  }

  add(name, content, expDays = 365, props = '') {
    if (!name || !content) return this;

    const d = new Date();
    d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${content};expires=${d.toUTCString()};${props}path=/`;

    this.formatted = this.fetch();

    return this;
  }

  get(name = '') {
    const arr = this.formatted;
    const result = arr.filter((item) => item.name === name);

    if (result.length === 0) return null;

    return result[0];
  }

  delete(name = '') {
    const target = this.get(name);
    if (!target) return null;
    document.cookie = `${target.name}='';expires=${this.expDays};path=/`;
    this.formatted = this.fetch();
    return target;
  }
}
