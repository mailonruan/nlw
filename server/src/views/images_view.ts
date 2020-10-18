import Image from '../models/Image';

export default {
  render(image: Image) {
    return `${process.env.API_URL}/images/${image.path}`;
  },

  renderMany(images: Image[]) {
    if(!images) return [];
    return images.map(image => this.render(image));
  }
}