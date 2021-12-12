$(document).ready(function() {
				let allNav = $(".navbar .container-fluid .col-xs-4");
				let allContent = $(".content");
				let time = null;//0,1,2---morning,noon,night
				let timer0 = null;
				let timer1 = null;
				let timer2 = null;
				let run0 = false;
				let run1 = false;
				let run2 = false;
				// console.log(allNav);
				let breakfast = [{'name':'包子'},{'name':'稀饭'}];
				let lunch = [{'name':'怪噜炒饭'},{'name':'五股卤面'}];
				let dinner = [{'name':'火锅'},{'name':'蒸菜'}];
				
				let breakfastStr = JSON.stringify(breakfast);
				let lunchStr = JSON.stringify(lunch);
				let dinnerStr = JSON.stringify(dinner);
				//全空的话初始化
				if($.cookie('morning') == null && $.cookie('noon') == null && $.cookie('night') == null){
					$.cookie('morning',breakfastStr,{expires: 36500});
					$.cookie('noon',lunchStr,{expires: 36500});
					$.cookie('night',dinnerStr,{expires: 36500});
					alert('答应我好好吃饭哦♥');
				}
				
				//数据刷新
				function refreshData(time){
					$(".table tr:gt(0)").html('');//清空之前的数据
					switch(time){
						case 0:
							let bFoodArr = JSON.parse($.cookie('morning'));
							for(let i = 0;i<bFoodArr.length;i++){
								$(".table").append(`<tr><td>${bFoodArr[i].name}</td><td><a class="detailsBtn">详情</a><a id="${i}" class="delBtn">删除</a></td></tr>`);
							}
							$(".table tr th:first").html(`食物名称<span class='badge'>${bFoodArr.length}</span>`);
							break;
						case 1:
							let lFoodArr = JSON.parse($.cookie('noon'));
							for(let i = 0;i<lFoodArr.length;i++){
								$(".table").append(`<tr><td>${lFoodArr[i].name}</td><td><a class="detailsBtn">详情</a><a id="${i}" class="delBtn">删除</a></td></tr>`);
							}
							$(".table tr th:first").html(`食物名称<span class='badge'>${lFoodArr.length}</span>`);
							break;
						case 2:
							let dFoodArr = JSON.parse($.cookie('night'));
							for(let i = 0;i<dFoodArr.length;i++){
								$(".table").append(`<tr><td>${dFoodArr[i].name}</td><td><a class="detailsBtn">详情</a><a id="${i}" class="delBtn">删除</a></td></tr>`);
							}
							$(".table tr th:first").html(`食物名称<span class='badge'>${dFoodArr.length}</span>`);
							break;
					}
				}
				
				//随机食物
				$(".content .btn").click(function(){
					switch(time){
						case 0:
							let bFoodArr = JSON.parse($.cookie('morning'));
							if(!run0){
								$(this).text("停止");
								run0 = true;
								timer0 = setInterval(function(){
									let r = Math.ceil(Math.random() * bFoodArr.length),
										breakfast = bFoodArr[r-1].name;
									$(".what:eq(0)").text(breakfast);
								},100);
							}else{
								$(this).text("不行，换一个");
								clearInterval(timer0);
								run0 = false;
							}
							break;
						case 1:
							let lFoodArr = JSON.parse($.cookie('noon'));
							if(!run1){
								$(this).text("停止");
								run1 = true;
								timer1 = setInterval(function(){
									let r = Math.ceil(Math.random() * lFoodArr.length),
										lunch = lFoodArr[r-1].name;
									$(".what:eq(1)").text(lunch);
								},100);
							}else{
								$(this).text("不行，换一个");
								clearInterval(timer1);
								run1 = false;
							}
							break;
						case 2:
							let dFoodArr = JSON.parse($.cookie('night'));
							if(!run2){
								$(this).text("停止");
								run2 = true;
								timer2 = setInterval(function(){
									let r = Math.ceil(Math.random() * dFoodArr.length),
										dinner = dFoodArr[r-1].name;
									$(".what:eq(2)").text(dinner);
								},60);
							}else{
								$(this).text("不行，换一个");
								clearInterval(timer2);
								run2 = false;
							}
							break;
					}
				}) 
				
				
				//底部标签页切换
				allNav.click(function() {
					let index = $(this).index();
					time = index;
					$("#eat").slideUp();
					$(this).addClass("active");
					$(this).siblings().removeClass("active");
					allContent.eq(index).fadeIn().siblings().hide();
					// console.log(time);
				})
				
				//模态框显示时
				$('#myModal').on('show.bs.modal',
				    function() {
				        // alert('模态框...');
						switch(time){
							case 0:
								$("#myModalLabel").html('早餐一览<img src="img/breakfast.png" class="img-responsive img-food"/>');
								refreshData(time);
								break;
							case 1:
								$("#myModalLabel").html('午餐一览<img src="img/lunch.png" class="img-responsive img-food"/>');
								refreshData(time);
								break;
							case 2:
								$("#myModalLabel").html('晚餐一览<img src="img/dinner.png" class="img-responsive img-food"/>');
								refreshData(time);
								break;
							default:
								console.log('error');
						}
				    })
				
				//添加食物功能
				$(".btn-success").click(function() {
					let food = $("#addFood").val();
					let bFoodStr = $.cookie('morning');
					let lFoodStr = $.cookie('noon');
					let dFoodStr = $.cookie('night');
					
					switch(time){
						case 0:
							let bFoodArr = JSON.parse(bFoodStr);
							// console.log(bFoodStr);
							let same0 = false;
							for(let i = 0;i<bFoodArr.length;i++){
								if(food == bFoodArr[i].name){
									same0 = true;
									break;
								}
							}
							if(food && !same0){
								bFoodArr.push({'name':food});
								$.cookie('morning',JSON.stringify(bFoodArr),{expires: 36500});
								//刷新数据
								refreshData(time);
							}else if(same0){
								alert('这个之前已经在早餐小分队啦！');
							}else{
								alert('不能放空的食物哈~');
							}
							break;
						case 1:
							let lFoodArr = JSON.parse(lFoodStr);
							let same1 = false;
							for(let i = 0;i<lFoodArr.length;i++){
								if(food == lFoodArr[i].name){
									same1 = true;
									break;
								}
							}
							if(food && !same1){
								lFoodArr.push({'name':food});
								$.cookie('noon',JSON.stringify(lFoodArr),{expires: 36500});
								//刷新数据
								refreshData(time);
							}else if(same1){
								alert('这个之前已经在午餐小分队啦！');
							}else{
								alert('不能放空的食物哈~');
							}
							break;
						case 2:
							let dFoodArr = JSON.parse(dFoodStr);
							let same2 = false;
							for(let i = 0;i<dFoodArr.length;i++){
								if(food == dFoodArr[i].name){
									same2 = true;
									break;
								}
							}
							if(food && !same2){
								dFoodArr.push({'name':food});
								$.cookie('night',JSON.stringify(dFoodArr),{expires: 36500});
								//刷新数据
								refreshData(time);
							}else if(same2){
								alert('这个之前已经在晚餐小分队啦！');
							}else{
								alert('不能放空的食物哈~');
							}
							break;
						default:
							console.log('error');
					}
					
				})
				
				//删除单项食物
				$(".table").on('click','.delBtn',function(){
					// console.log('点击删除');
					var _this = $(this);
					if(window.confirm("确定删除嘛？")){
						switch(time){
							case 0:
								let bFoodArr = JSON.parse($.cookie('morning'));
								bFoodArr.splice(_this.attr('id'),1);
								$.cookie('morning',JSON.stringify(bFoodArr),{expires: 36500});
								refreshData(time);
								break;
							case 1:
								let lFoodArr = JSON.parse($.cookie('noon'));
								lFoodArr.splice(_this.attr('id'),1);
								$.cookie('noon',JSON.stringify(lFoodArr),{expires: 36500});
								refreshData(time);
								break;
							case 2:
								let dFoodArr = JSON.parse($.cookie('night'));
								dFoodArr.splice(_this.attr('id'),1);
								$.cookie('night',JSON.stringify(dFoodArr),{expires: 36500});
								refreshData(time);
								break;
							default:
								console.log('删除失败');
						}
					}
				})
				
				//详情
				$(".table").on('click','.detailsBtn',function(){
					let index = $(this).siblings().attr('id');
					$("#details").fadeIn();
					$("#myModal").slideUp();//迷迷迷
					$("#foodName").html('');
					switch(time){
						case 0:
							let breakfast = JSON.parse($.cookie('morning'));
							let breakfastItem = breakfast[index];
							$("#foodName").html(breakfastItem.name);
							$("#textArea").val(breakfastItem['detail']);
							break;
						case 1:
							let lunch = JSON.parse($.cookie('noon'));
							let lunchItem = lunch[index];
							$("#foodName").html(lunch[index].name);
							$("#textArea").val(lunchItem['detail']);
							break;
						case 2:
							let dinner = JSON.parse($.cookie('night'));
							let dinnerItem = dinner[index];
							$("#foodName").html(dinner[index].name);
							$("#textArea").val(dinnerItem['detail']);
							break;
					}
					
					
				})
				$("#okBtn").click(function(){
					let textVal = $("#textArea").val();
					// console.log(textVal);
					switch(time){
						case 0:
							let breakfast = JSON.parse($.cookie('morning'));
							for(let i = 0;i<breakfast.length;i++){
								if($("#foodName").html() == breakfast[i].name){
									let breakfastItem = breakfast[i];
									breakfastItem['detail'] = textVal;
									// console.log(breakfast);
									$.cookie('morning',JSON.stringify(breakfast),{expires: 36500});
									break;
								}
							}
							break;
						case 1:
							let lunch = JSON.parse($.cookie('noon'));
							for(let i = 0;i<lunch.length;i++){
								if($("#foodName").html() == lunch[i].name){
									let lunchItem = lunch[i];
									lunchItem['detail'] = textVal;
									// console.log(breakfast);
									$.cookie('noon',JSON.stringify(lunch),{expires: 36500});
									break;
								}
							}
							break;
						case 2:
							let dinner = JSON.parse($.cookie('night'));
							for(let i = 0;i<dinner.length;i++){
								if($("#foodName").html() == dinner[i].name){
									let dinnerItem = dinner[i];
									dinnerItem['detail'] = textVal;
									// console.log(breakfast);
									$.cookie('night',JSON.stringify(dinner),{expires: 36500});
									break;
								}
							}
							break;
					}
					$("#details").fadeOut("slow");
					$("#myModal").slideDown();
					
				})
				
			})