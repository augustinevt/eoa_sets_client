const apiDomain = 'http://localhost:8000';

export default {
  getSets: (treeName) => {
    return fetch(`${apiDomain}/sets`).then((res => {
      console.log(res)
      return res.json();
    }));
  },
}
