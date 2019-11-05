var page_vue = page_vue || {};
page_vue = {
		page : x =>{
			return'<div class="container">'+
			'<div id ="pageSize"></div>'+
			'  <ul id ="pagination"class="pagination">'+
			'    <li class="page-item"><a class="page-link" href="#">Previous</a></li>'+
			'    <li class="page-item"><a class="page-link" href="#">1</a></li>'+
			'    <li class="page-item"><a class="page-link" href="#">2</a></li>'+
			'    <li class="page-item"><a class="page-link" href="#">3</a></li>'+
			'    <li class="page-item"><a class="page-link" href="#">Next</a></li>'+
			'  </ul>'+
			'</div>'
		}
}