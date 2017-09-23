const apiDomain = 'http://localhost:8000';

export default {
  getSets: (treeName) => {
    return fetch(`${apiDomain}/sets`).then((res => {
      console.log(res)
      return res.json();
    }));
  },
  createSet: (newSet) => {
    return fetch(`${apiDomain}/sets`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(newSet)
    }).then((res => {
      console.log(res)
      return res.json();
    }));
  },
  deleteSet: (setId) => {
    return fetch(`${apiDomain}/sets/${setId}`, {
      method: 'DELETE',
    }).then((res => {
      console.log("in api", res);
      return res.json();
    }));
  },
  updateSet: (setId, setObj) => {
    return fetch(`${apiDomain}/sets/${setId}`, {
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(setObj)
    }).then((res => {
      console.log("in api", res);
      return res.json();
    }));
  },
}
