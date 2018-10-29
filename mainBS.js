  $.getJSON("https://api.myjson.com/bins/udbm5", function(data){
      var getBooks = data.books;
      //test: show full array and element
      console.log(getBooks);
      console.log(getBooks[0]);
      mainFunction(getBooks);
  })


  function mainFunction(books){

      var print = new Vue({
      	el: '#mainVueEl',
      	data: {
      		books: books,
      		keyword: '',
      		loading: false,
      		sort: 'default'
      	},
        created: function() {
            this.loading = false; // loader off
        },
      	computed: {
      		filteredBooks: function(){

      			//diferent sort options
      			if (this.sort == 'author'){
	      				var tempSort = this.books.sort((a, b) => 
						    (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) ? -1 : (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) ? 1 : 0)
	      			} else {
	      				var tempSort = this.books.sort((a, b) => 
					    	(a.titulo.toLowerCase() < b.titulo.toLowerCase()) ? -1 : (a.titulo.toLowerCase() > b.titulo.toLowerCase()) ? 1 : 0)
	      			} 
      			console.log('sorted: ' + this.sort);

      			//filter -> title / description / language
      			return this.books.filter((book) => {
      				return book.titulo.toLowerCase().includes(this.keyword.toLowerCase()) 
      						|| book.descripcion.toLowerCase().includes(this.keyword.toLowerCase())
      						|| book.idioma.toLowerCase().includes(this.keyword.toLowerCase());
      			})
      		}
      	}
      });
  }