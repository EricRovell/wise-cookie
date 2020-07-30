export default class Phrase {
  constructor({ id = null, category, pack, position, body, author }) {
    // metadata
    if (id) {
      [ this.category, this.pack, this.position ] = id.split("/");
    } else {
      this.category = category;
      this.pack = pack;
      this.position = position;
    }

    // phrase data
    this.body = body;
    this.author = author;
  }

  static async fromID(id) {
    const [ category, pack, position ] = id.split("/");
    return Phrase.fromURL({ category, pack, position });
  }

  static async fromURL({ category, pack, position }) {
    const url = `/data/categories/${category}/pack_${pack}.json`;
    const response = await fetch(url, { cache: "force-cache" });

    if (response.ok) {
      const { phrases } = (await response.json());
      return new Phrase({
        category,
        pack,
        position,
        body: phrases[position].body,
        author: phrases[position].author
      });
    } else {
      console.log(response.status);
      return null;
    }
  }

  get id() {
    return [ this.category, this.pack, this.position ].join("/");
  }

  get packURL() {
    return `/data/categories/${this.category}/pack_${this.pack}.json`;
  }

  get url() {
    return `/phrase/${this.id}`;
  }

  toString() {
    return `"${this.body}" - ${this.author}`;
  }

  toObject() {
    return {
      id: this.id,
      body: this.body,
      author: this.author
    };
  }

}