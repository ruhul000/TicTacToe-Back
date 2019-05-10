var IP = "http://www.ory.es/ranking/";
var URLCommon = IP+"API/APIHandler_Common.php?";
var style = "";

$(document).ready(function ()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    style = url.searchParams.get("style");
	
	var demo = style;
    var ArticlePhoto = '<img src="media/'+demo+'.jpg" alt="Nature"  width="300" height="300">';
    var ArticleVideo = '<video width="300" height="300" controls><source src="media/'+demo+'.mp4" type="video/mp4"></video>';
    document.getElementById("ArticlePhoto").innerHTML = ArticlePhoto;
    document.getElementById("ArticleVideo").innerHTML = ArticleVideo;

    document.getElementById("articleName").innerHTML = style;
    
    var Cups = GetAllCups(style); // GET CUPS

    if(!IsEmpty(Cups)) // LOAD CUPS
    {
        var cupBTNStart = '<div id="cupButtons" class="btn" data-toggle="buttons">';
        var cupBTN = '';
        
        $.each(Cups, function(key, value)
        {
            cupBTN +=   '<label class="btn btn-success"><input type="radio" name="CupOptions"  id="CupOptions" value="'+value[2]+'">'+value[2]+'</label>';
        });

        var cupBTNEnd = '</div>';

        var cupButtonDiv = cupBTNStart+cupBTN+cupBTNEnd;
        document.getElementById('cupButtonsList').innerHTML = "";
        document.getElementById('cupButtonsList').innerHTML = cupButtonDiv;    
    }
    else
    {
        document.getElementById('cupButtonsList').innerHTML = "Cups Not Found";  

        GetAllColorByArticle(style); 

        GetAllSizeByArticle(style);    
    }
});

$(document).on('click', '#cupButtons', function()
{ 
    
    var Cup = $("input[name='CupOptions']:checked").val();
    //var CupText = $("input[name='CupOptions']:checked").parent('label').text();;
    // alert(Cup + "-" + CupText);
    // alert(style+Cup);
    var article = style+Cup;

    GetAllColorByArticle(article); 
    GetAllSizeByArticle(article); 


});

$(document).on('click', '#colorButtons', function()
{   
    var Cup = $("input[name='CupOptions']:checked").val();
    var Color = $("input[name='ColorOptions']:checked").val();
    //var CupText = $("input[name='CupOptions']:checked").parent('label').text();;
    // alert(Cup + "-" + CupText);
    // alert(style+Cup);
    var article = "";
    if(Cup !== undefined)
    {
        article = style+Cup;
    }
    else
    {
        article = style;
    }
    //alert(article + "-"+Color);
    GetAllStock(article,Color); 
});

function IsEmpty(data)
{
    var IsEmpty = false;

    $.each(data, function(key, value)
    {
        if(value[2].trim()=="")
        {
            IsEmpty = true;
            return false;
        }
    });
    return IsEmpty;

}

function GetAllStock(article,color)
{
    var Stock = "";

    $.ajax({

        url : URLCommon+'action=GetAllStock',
        type: 'POST',
        dataType : "json",
        data: JSON.stringify({article: article, color:color}),
        async: false, 
        success: function(data)
        {
            Stock = data;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            
        }

    });

    if(!$.isEmptyObject(Stock)) // LOAD CUPS
    {
        var sizeBTNStart = '<div id="sizeButtons" class="btn" data-toggle="buttons">';
        var sizeBTN = '';
        
        $.each(Stock, function(key, value)
        {
            if(value[3]<1)
            {
                sizeBTN +=   '<label class="btn btn-danger"><input type="radio" name="SizeOptions"  id="SizeOptions" value="'+value[5]+'">'+value[5]+'</label>';
            }
            else if(value[3]>=1 && value[3]<=5)
            {
                sizeBTN +=   '<label class="btn btn-warning"><input type="radio" name="SizeOptions"  id="SizeOptions" value="'+value[5]+'">'+value[5]+'</label>';
        
            }
            else if(value[3]>5)
            {
                sizeBTN +=   '<label class="btn btn-success"><input type="radio" name="SizeOptions"  id="SizeOptions" value="'+value[5]+'">'+value[5]+'</label>';
        
            }

        });

        var sizeBTNEnd = '</div>';

        var sizeButtonDiv = sizeBTNStart+sizeBTN+sizeBTNEnd;
        document.getElementById('sizeButtonList').innerHTML = "";
        document.getElementById('sizeButtonList').innerHTML = sizeButtonDiv;    
    }
    else
    {
        document.getElementById('sizeButtonList').innerHTML = "Sizes Not Found";      
    }
}

function GetAllCups(style)
{ 
    var Cups = "";

    $.ajax({

        url : URLCommon+'action=GetAllCups',
        type: 'POST',
        dataType : "json",
        data: JSON.stringify({style: style}),
        async: false, 
        success: function(data)
        {
            Cups = data;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            
        }

    });

    return Cups;
}

function GetAllColorByArticle(article)
{
    var Colors = "";

    $.ajax({

        url : URLCommon+'action=GetAllColorByArticle',
        type: 'POST',
        dataType : "json",
        data: JSON.stringify({article: article}),
        async: false, 
        success: function(data)
        {
            Colors = data;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            
        }

    });

    
    if(!$.isEmptyObject(Colors)) // LOAD CUPS
    {
        var colorBTNStart = '<div id="colorButtons" class="btn" data-toggle="buttons">';
        var colorBTN = '';
        
        $.each(Colors, function(key, value)
        {
            colorBTN +=   '<label class="btn btn-default"><input type="radio" name="ColorOptions"  id="ColorOptions" value="'+value[2]+'">'+value[2]+'</label>';
        });

        var colorBTNEnd = '</div>';

        var colorButtonDiv = colorBTNStart+colorBTN+colorBTNEnd;
        document.getElementById('colorButtonList').innerHTML = "";
        document.getElementById('colorButtonList').innerHTML = colorButtonDiv;    
    }
    else
    {
        document.getElementById('colorButtonsList').innerHTML = "Colors Not Found";      
    }
}

function GetAllSizeByArticle(article)
{
    var Sizes = "";

    $.ajax({

        url : URLCommon+'action=GetAllSizeByArticle',
        type: 'POST',
        dataType : "json",
        data: JSON.stringify({article: article}),
        async: false, 
        success: function(data)
        {
            Sizes = data;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            
        }

    });

    if(!$.isEmptyObject(Sizes)) // LOAD CUPS
    {
        var sizeBTNStart = '<div id="sizeButtons" class="btn" data-toggle="buttons">';
        var sizeBTN = '';
        
        $.each(Sizes, function(key, value)
        {
            sizeBTN +=   '<label class="btn btn-default"><input type="radio" name="SizeOptions"  id="SizeOptions" value="'+value[2]+'">'+value[2]+'</label>';
        });

        var sizeBTNEnd = '</div>';

        var sizeButtonDiv = sizeBTNStart+sizeBTN+sizeBTNEnd;
        document.getElementById('sizeButtonList').innerHTML = "";
        document.getElementById('sizeButtonList').innerHTML = sizeButtonDiv;    
    }
    else
    {
        document.getElementById('sizeButtonList').innerHTML = "Sizes Not Found";      
    }
}

function CheckShopID(ShopID)
{
    var IsValid = false;

        $.ajax({

        url : URLCommon+'action=CheckShopID',
        type: 'POST',
        dataType : "json",
        data: JSON.stringify({ShopID: ShopID}),
        async: false, 
        success: function(data)
        {
            IsValid = data;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) 
        {
            
        }

    });

    return IsValid;
}

function PlaceOrder()
{
    var ShopID = $("#Order input[name=ShopID]").val();

    if(ShopID !=='')
    {
        if(CheckShopID(ShopID.trim()))
        {
            
            var Cup = "";
            var Color = "";
            
            var ArticleName =  style; 
            var Cup = $("input[name='CupOptions']:checked").val();
            var Color = $("input[name='ColorOptions']:checked").val();
            var Size = $("input[name='SizeOptions']:checked").val();
            var Qty = 1;

            //alert("Name: "+ArticleName+" | Cup: "+Cup+" | Color: "+Color+" | Size: "+Size);
            var IsOk = 1;
            var ErrorMassge = "";
            

            
            if(Color === undefined )
            {
                IsOk = 0;
                ErrorMassge = "Color is missing..!!";
                //alert(ErrorMassge);
            } 
            
            if(Size === undefined)
            {
                IsOk = 0;
                ErrorMassge = ErrorMassge + "\n" + "Size is missing..!!";
                //alert(ErrorMassge);
            }
            
        
            if(IsOk==1)
            {
                var IsPlaced = false;

                
                $.ajax({

                    url : URLCommon+'action=PlaceOrder',
                    type: 'POST',
                    dataType : "json",
                    data: JSON.stringify({ShopID: ShopID, Style : ArticleName, Cup : Cup, Color : Color, Size : Size, Qty : Qty }),
                    async: false, 
                    success: function(data)
                    {
                        IsPlaced = data;
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) 
                    {
                        
                    }
                });

                if(IsPlaced)
                {
                    alert("Order Placed Successfully..!!");
                }
                else
                {
                    alert("Order Failed..!!");
                }
            }
            else
            {
                alert(ErrorMassge);
            }
        }
        else
        {
            alert("Invalid Shop ID");
        }
    }
    else
    {
        alert("Please insert shop id..!!");
    }
    
	$("#Order input[name=ShopID]").innerHTML = "";
	 
	$('#exampleModal').modal('hide');

}
