var EdTable = function(){
	// 给单元格绑定事件
	function initBindGridEvent(){
		$("td.editable").unbind();
		// 添加单元格点击事件
		addGridClickEvent();
		// 添加单元格双击事件
		addGridDbClickEvent();
		// 添加键盘事件
		addGridKeyPressEvent();
	}
	
	// 给单元格添加单击事件
	function addGridClickEvent(){
		$("td.simpleInput").bind("click",function(){
			$('.simpleInput').each(function(){
				$(this).removeClass("selectCell");
			});
			// 给选中的元素添加选中样式
			$(this).addClass("selectCell");
		});
	}
	
	//给单元格添加双击事件
	function addGridDbClickEvent(){
		$("td.simpleInput").bind("dblclick",function(){
			$('.simpleInput').each(function(){
				$(this).removeClass("selectCell");
			});
			var val=$(this).html();
			var width = $(this).css("width");
			var height = $(this).css("height");
			$(this).html("<input type='text' onblur='EdTable.saveEdit(this)' style='width:"+ width +";height:"+ height +"; padding:0px; margin:0px;' value='"+val+"' >");
			$(this).children("input").select();
		});	
	}
	
	// 给单元格添加键盘事件
	function addGridKeyPressEvent(){
		$(document).keyup(function(event){
			if(event.keyCode == 37){
				// 左箭头
				var selectCell = $(".selectCell").prev()[0];
				if(selectCell != undefined){
					$(".selectCell").removeClass("selectCell").prev().addClass("selectCell");
				}
			} else if(event.keyCode == 38){
				// 上箭头
				var col = $(".selectCell").prevAll().length;
				var topCell = $(".selectCell").parent("tr").prev().children()[col];
				if(topCell != undefined){
					$(".selectCell").removeClass("selectCell");
					$(topCell).addClass("selectCell");
				}
			} else if(event.keyCode == 39){
				// 右箭头
				var selectCell = $(".selectCell").next()[0];
				if(selectCell != undefined){
					$(".selectCell").removeClass("selectCell").next().addClass("selectCell");
				}
			} else if(event.keyCode == 40){
				// 下箭头
				var col = $(".selectCell").prevAll().length;
				var topCell = $(".selectCell").parent("tr").next().children()[col];
				if(topCell != undefined){
					$(".selectCell").removeClass("selectCell");
					$(topCell).addClass("selectCell");
				}
			} else if(event.keyCode == 13){
				// 回车键
				var selectCell = $(".selectCell")[0];
				if(selectCell != undefined){
					$(selectCell).dblclick();
				}
			}
		});
	}

	function GetInfoFromTable(editableTable) {
	  var tableInfo = "[";
	  var tableObj = document.getElementById(editableTable);
	  for (var i = 0; i < tableObj.rows.length; i++) {  //遍历Table的所有Row
	  	tableInfo += "  {";
	    for (var j = 0; j < tableObj.rows[i].cells.length; j++) {  //遍历Row中的每一列
	      tableInfo +=i+" "+ j + ":'" +tableObj.rows[i].cells[j].innerText+"'";  //获取Table中单元格的内容
	      tableInfo += "  ";
	    }
	    tableInfo += "  },";
	    tableInfo += "\n";
	  }
	   tableInfo += "]";
	  return tableInfo;
}
	
	// 单元格失去焦点后保存表格信息
	function saveEdit(gridCell){
		var pnt=$(gridCell).parent();
		$(pnt).html($(gridCell).attr("value"));
	/*	var v = "";
 		$("#editableTable tr:gt(0):eq(1) td").each(function () {
       		 v += $(this).text() + " ";
 		});*/
		console.log(GetInfoFromTable("editableTable"));
		$(gridCell).remove();
	}
	return{
		initBindGridEvent : initBindGridEvent,
		saveEdit : saveEdit
	}
}();