(function($) {
	$.fn.jQAList = function(options) { 
		// merge default and user parameters
		options = $.extend(
					{
					   searchbox:'#alist-searchbox',
					   container:'#alist-container',
					   repeater: '.alist-item',
					   valueselectors:null,
					   defaultListDisplay:false,
					   sortOptions:null,
						/*[{event:'click',selector:'#sortByName',sortSelector:'.name'}]*/
					  
/*
To be Completed
 paginationOptions:		{enabled:false,pageLength:5,showMaxPageNumbers:5,showFirst:true,showLast:true,showPrev:true,showNext:true}
*/						
					},
				 options
				);

		if(options.valueselectors===null)
			throw 'valueselectors cannot be null';

	    var jQAListActions = function(container,repeater,valueselectors){
		var self = this;
		var MATCH_SELECTOR='jQAList-found';	
		var sorted ='asc'
		this.showAList = function(){
		   $(container +' > '+ repeater).show();
		};	

		this.hideAList = function(){
		   $(container +' > '+ repeater).hide();
		};

		this.clearAListSearchResults = function(){
		   $(container +' > '+ repeater+'['+MATCH_SELECTOR+'=true]').removeAttr(MATCH_SELECTOR);
		};

		this.searchAList = function(searchString){
			self.clearAListSearchResults();
			$(container +' > '+ repeater).each(function(){
				 $(this).find(valueselectors.toString()).each(function(){
					if($(this).text().toLowerCase().search(searchString)>-1){
						$(this).parents(repeater).attr(MATCH_SELECTOR,'true');
						return;					
					}
				});
			});
		 	self.updateAList(container +' > '+ repeater);
		};
		
		
		this.sortAList= function(sortBySelector,sorted){
			$(container +' > '+ repeater).sort(function(a,b) {
			     return sorted ==='asc' ? 
				$($(a).find(sortBySelector)).text() > $($(b).find(sortBySelector)).text() 
				:
				 $($(a).find(sortBySelector)).text() < $($(b).find(sortBySelector)).text();
			}).appendTo(container);

		}
		

		this.updateAList= function(selector){
			self.hideAList();
		 	$(selector+'['+MATCH_SELECTOR+'=true]').show();
	       };


	    };

		var jQAlistactions = new jQAListActions(options.container,options.repeater,options.valueselectors);
 		
		if(options.defaultListDisplay){
		     jQAlistactions.showAList();
		}else{
		    jQAlistactions.hideAList();
		}
		

		$($.find(options.searchbox)).on('keyup',function(){
				var searchString=$(this).val().toLowerCase().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
				jQAlistactions.searchAList(searchString,options.container,options.repeater,options.valueselectors);
		});

		
	    if(options.sortOptions!=null){
		$(options.sortOptions).each(function(){
			$(this.selector).attr('jQAlist-sort',this.sortSelector);
			$(this.selector).on(this.event,function(){
				if($(this).attr('jQAlist-sorted')=='asc')
					$(this).attr('jQAlist-sorted','dsc')
				else
					$(this).attr('jQAlist-sorted','asc')
				jQAlistactions.sortAList($(this).attr('jQAlist-sort'),$(this).attr('jQAlist-sorted'));
			});
		});
	     }
		
	  
		return {api:jQAlistactions,options:options};
	 };
})(jQuery);
