# jQuery.jQAList




## Installation

Include script *after* the jQuery library :

```html
<script src="<<path-to>>/jquery.jQAList.js"></script>
```


## Usage

###Example:
HTML :
```html
		<span class="searchbox">
			<label>Search String</label>
			<input type="text" value="" id="alist-searchbox"/>
			
			<button id="sortByName">Sort By Name</button>
			<button id="sortByProfession">Sort By Profession</button>
			<button id="sortByRS">Sort By Relationship-Status</button>
		</span>
		 <div id="alist-pagination">
	 	 </div>
		  <div id="alist-container">
			<div class="alist-item">
				<span><label>Name :</label><span class="name">Robin</span></span>
				<span><label>Profession :</label><span class="profession">News Reader</span></span>
				<span><label>Relationship-Status :</label><span class="rs">Commited</span></span>
			</div>
			<div class="alist-item">
				<span><label>Name :</label><span class="name">Ted</span></span>
				<span><label>Profession :</label><span class="profession">Architect</span></span>
				<span><label>Relationship-Status :</label><span class="rs">Don no</span></span>
			</div>
			<div class="alist-item">
				<span><label>Name :</label><span class="name">Lilly</span></span>
				<span><label>Profession :</label><span class="profession">Teacher</span></span>
				<span><label>Relationship-Status :</label><span class="rs">Married</span></span>
			</div>

			<!-- Examples -->
			<div class="alist-item">
				<span><label>Name :</label><span class="name">Name One</span></span>
				<span><label>Profession :</label><span class="profession">Profession Type Two</span></span>
				<span><label>Relationship-Status :</label><span class="rs">R Status Two</span></span>
			</div>
			<div class="alist-item">
				<span><label>Name :</label><span class="name">Name Two</span></span>
				<span><label>Profession :</label><span class="profession">Infrastrusture Architect</span></span>
				<span><label>Relationship-Status :</label><span class="rs">Don no</span></span>
			</div>
			<div class="alist-item">
				<span><label>Name :</label><span class="name">Name Three</span></span>
				<span><label>Profession :</label><span class="profession">Professor</span></span>
				<span><label>Relationship-Status :</label><span class="rs">Confused</span></span>
			</div>
		</div>
``` 

JQuery Binding:

```javascript
		$('#container').jQAList(
				{ 
					valueselectors:['.name','.rs','.profession'],
					sortOptions :[
							{event:'click',selector:'#sortByName',sortSelector:'.name'},
							{event:'click',selector:'#sortByProfession',sortSelector:'.profession'},
							{event:'click',selector:'#sortByRS',sortSelector:'.rs'}
						      ],
					paginationOptions:{
						enabled:true,
						pageLength:10,
						showMaxPageNumbers:3
					}
				}
				);
````
















## Authors

[Anant Pal](http://anantkpal.github.io)

##Copyright And License
Copyright (c) 2013,2014 Anant Pal(anantkpal@yahoo.co.in) All rights reserved. 
The copyrights embodied in the content of this file are licensed by Anant Pal(anantkpal@yahoo.co.in) under the BSD open source license
