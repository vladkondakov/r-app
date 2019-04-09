export default request => {
    const structure = [];
    fetch(request)
        .then(response => response.json())
        .then(data => { 
            this.structure = data;
        })
    .catch(error => console.log(error));
    return structure;
}