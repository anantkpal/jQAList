(function($) {
	$.fn.jQAList = function(options) { 
		// merge default and user parameters
		options.paginationOptions = $.extend({
 					   		enabled:false,
 					   		pageLength:5,
 					   		showMaxPageNumbers:5,
 							  showFirst:true,
 							  showLast:true,
 							  showPrev:true,
 							  showNext:true,
 							  container:'#alist-pagination'
 						},options.paginationOptions)
		options = $.extend(
					{
					   searchbox:'#alist-searchbox',
					   container:'#alist-container',
					   repeater: '.alist-item',
					   valueselectors:null,
					   defaultListDisplay:true,
					   sortOptions:null,
 					   paginationOptions:null
					},
				 options
				);

		if(options.valueselectors===null)
			throw 'valueselectors cannot be null';

	    var jQAListActions = function(container,repeater,valueselectors,paginationoptions){
		var self = this;
		var MATCH_SELECTOR='jQAList-found';	
		var sorted ='asc';
		
		this.pagination={
		  enabled:paginationoptions.enabled,
			pageLength:paginationoptions.pageLength,
			showMaxPageNumbers:paginationoptions.showMaxPageNumbers,
			showFirst:paginationoptions.showFirst,
			showLast:paginationoptions.showLast,
			showPrev:paginationoptions.showPrev,
			showNext:paginationoptions.showNext,
			currentActivePage:1,
			container:paginationoptions.container,
			totalPages:Math.ceil($(container +' > '+ repeater+'['+MATCH_SELECTOR+'=true]').size()/paginationoptions.pageLength),
			update:function(){
				if(!self.pagination.enabled)
					return;
				self.pagination.totalPages=Math.ceil($(container +' > '+ repeater+'['+MATCH_SELECTOR+'=true]').size()/self.pagination.pageLength);
				$($(self.pagination.container).find('ul[jqalist-plist]')).remove();
				if(self.pagination.totalPages<=0){
					return;
				}
				var jqalist_plist=$(self.pagination.container).append('<ul jqalist-plist="ul"></ul>');
				jqalist_plist =($(self.pagination.container).find('ul[jqalist-plist]'));
				$(jqalist_plist).append('<li jqalist-plist="prev">Prev</li>');
				$(jqalist_plist).append('<li jqalist-plist="first">First</li>');
				$(jqalist_plist).append('<li jqalist-plist="last">Last</li>');
				$(jqalist_plist).append('<li jqalist-plist="next">Next</li>');
				$(jqalist_plist).find('li[jqalist-plist=first]').
					after('<li jqalist-plist="'+
					self.pagination.currentActivePage+
					'" jqalist-plist-active="true">'+self.pagination.currentActivePage+'</li>');	
				
				var nfPrevShowNums=0;
				var nfNextShowNums=0;
				var addBefore=true;
				
				while(nfPrevShowNums+nfNextShowNums+1<self.pagination.showMaxPageNumbers
					 && nfPrevShowNums+nfNextShowNums+1<self.pagination.totalPages){
					if(addBefore){
						addBefore=false;
						if(self.pagination.currentActivePage-nfPrevShowNums-1>=1){
							$(jqalist_plist).
								find('li[jqalist-plist=first]').
									after('<li jqalist-plist="'
										+(self.pagination.currentActivePage-nfPrevShowNums-1)
										+'">'+(self.pagination.currentActivePage-nfPrevShowNums-1)
										+'</li>');
							nfPrevShowNums++;
							
							}		
					}else{
					addBefore=true;
						if(self.pagination.currentActivePage+nfNextShowNums+1<=self.pagination.totalPages){
							$(jqalist_plist).find('li[jqalist-plist=last]').before('<li jqalist-plist="'+(self.pagination.currentActivePage+nfNextShowNums+1)+'">'+(self.pagination.currentActivePage+nfNextShowNums+1)+'</li>');
							nfNextShowNums++;
							
							}		
					
					}
				}
				if($(jqalist_plist).find('li[jqalist-plist=first]').next().attr('jqalist-plist')!='1')
					$(jqalist_plist).find('li[jqalist-plist=first]').after('<li>..</li>');
				if($(jqalist_plist).find('li[jqalist-plist=last]').prev().attr('jqalist-plist')!=''+self.pagination.totalPages+'')
					$(jqalist_plist).find('li[jqalist-plist=last]').before('<li>..</li>');
				
				$(container+' > '+repeater+'['+MATCH_SELECTOR+'=true]').hide();
				var showList=$(container+' > '+repeater+'['+MATCH_SELECTOR+'=true]');
				for(i=((self.pagination.currentActivePage-1)*self.pagination.pageLength);(i<showList.length && i<((self.pagination.currentActivePage)*self.pagination.pageLength));i++)
					$(showList[i]).show();
				$($(self.pagination.container).find('li[jqalist-plist]')).on('click',self.pagination.setcurrentpage);
			},
			setcurrentpage:function(){
					var clickedNav=$(this).attr('jqalist-plist');
					if(clickedNav=='first')
						self.pagination.currentActivePage=1;
					else if(clickedNav=='last')
						self.pagination.currentActivePage=self.pagination.totalPages;
					else if(clickedNav=='next')
						self.pagination.currentActivePage=self.pagination.currentActivePage+1<=self.pagination.totalPages?self.pagination.currentActivePage+1:self.pagination.totalPages;
					else if(clickedNav=='prev')
						self.pagination.currentActivePage=self.pagination.currentActivePage-1>=1?self.pagination.currentActivePage-1:1;
					else
						self.pagination.currentActivePage=parseInt(clickedNav);
			self.pagination.update();
			
			}
		};


		this.showAList = function(){
		   
		   $(container +' > '+ repeater).show();
		   self.pagination.update();
		};	

		this.hideAList = function(){
		   
		   $(container +' > '+ repeater).hide();
		   self.pagination.update();
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
		 	self.pagination.currentActivePage=1;
		 	self.pagination.update();
	       };
		$(container +' > '+ repeater).attr(MATCH_SELECTOR,'true');
		self.pagination.update();
	    };

		var jQAlistactions = new jQAListActions(options.container,options.repeater,options.valueselectors,options.paginationOptions);
 		
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
