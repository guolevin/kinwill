$(document).on('click', "#getcode",function() {
    var data_src = $(this).attr("data-src");
    if (!data_src) {
        data_src = $(this).prop("src") + '&random=';
        $(this).attr({
            'data-src': data_src
        });
    }
    if (data_src.indexOf('&random=') < 0) data_src += '&random=';
    $(this).attr({
        src: data_src + Math.floor(Math.random() * 9999 + 1)
    });
});

function feedback_submission(btn){
    var post_form=$(btn).parents('form');
    var verify=true;//has-danger
    $(post_form).find("[required]").each(function(index,item){
        if(!verify)return;
        if(item.type=='text'||item.type=='textarea'||item.type=='select-one'){
            if(item.value==''){
                verify=false;
                $(item).focus();
                layer.msg('当前信息必填');
                $(item).parents('div.form-group').addClass('has-danger');
                return;
            }
        }else if(item.type=='checkbox'||item.type=='radio'){
            if(!post_form.find("input[name='"+item.name+"']:checked").length>0){
                verify=false;
                $(item).focus();
                layer.msg('当前信息至少选择一项');
                $(item).parents('div.form-group').addClass('has-danger');
                return;
            }
        }
    });
    if(verify){
        post_form.find("div.form-group").removeClass('has-danger');
        var requestUrl=post_form.attr('action');
        $.ajax({
            url: requestUrl,
            type: "post",
            dataType: "json",
            data:post_form.serialize(),
            success: function(result){
                if(result.status){
                    layer.msg(result.msg);
                    window.location.reload();
                }else{
                    layer.msg(result.msg);
                }
            }
        });
    }
};

function message_submission(btn){
	var post_form=$(btn).parents('form');
	var verify=true;//has-danger
	$(post_form).find("[required]").each(function(index,item){
		if(!verify)return;
		if(item.type=='text'||item.type=='textarea'||item.type=='select-one'){
			if(item.value==''){
				verify=false;
				$(item).focus();
				layer.msg('当前信息必填');
				$(item).parents('div.form-group').addClass('has-danger');
				return;
			}
		}else if(item.type=='checkbox'||item.type=='radio'){
			if(!post_form.find("input[name='"+item.name+"']:checked").length>0){
				verify=false;
				$(item).focus();
				layer.msg('当前信息至少选择一项');
				$(item).parents('div.form-group').addClass('has-danger');
				return;
			}
		}
	});
	if(verify){
		post_form.find("div.form-group").removeClass('has-danger');
		var requestUrl=post_form.attr('action');
		$.ajax({
	        url: requestUrl,
	        type: "post",
	        dataType: "json",
	        data:post_form.serialize(),
	        success: function(result){
	            if(result.status){
	            	layer.msg(result.msg);
	            	window.location.reload();
	            }else{
	            	layer.msg(result.msg);
	            }
	        }
	    });
	}
};

function resume_submission(btn){
  var post_form=$(btn).parents('form');
  var verify=true;//has-danger
  $(post_form).find("[required]").each(function(index,item){
    if(!verify)return;
    if(item.type=='text'||item.type=='textarea'||item.type=='select-one'){
      if(item.value==''){
        verify=false;
        $(item).focus();
        layer.msg('当前信息必填');
        $(item).parents('div.form-group').addClass('has-danger');
        return;
      }
    }else if(item.type=='checkbox'||item.type=='radio'){
      if(!post_form.find("input[name='"+item.name+"']:checked").length>0){
        verify=false;
        $(item).focus();
        layer.msg('当前信息至少选择一项');
        $(item).parents('div.form-group').addClass('has-danger');
        return;
      }
    }
  });
  if(verify){
    $(post_form).find("div.form-group").removeClass('has-danger');
    var requestUrl=post_form.attr('action');
    $.ajax({
          url: requestUrl,
          type: "post",
          dataType: "json",
          data:post_form.serialize(),
          success: function(result){
              if(result.status){
                layer.msg(result.msg);
                window.location.reload();
              }else{
                layer.msg(result.msg);
              }
          }
      });
  }
};