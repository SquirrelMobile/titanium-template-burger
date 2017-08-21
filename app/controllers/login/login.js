/**
 * @class Controller.login.login
 * Display login view
 *
 */

/**
 * @method Controller
 * Display login view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

  if(args.closeApp && OS_ANDROID){
    $.win.addEventListener("androidback", function(){
      var activity = Titanium.Android.currentActivity;
      activity.finish();
    });
  }

  $.login.listener('return', function(){
    $.password.focus();
  });

  $.password.listener('return', function(){
    connect();
  });

})($.args);


/**
 * openWin - open Signup or Lost password
 *
 * @param  {Object} e clicked object
 */
function openWin(e){

  var type = e.source.type;
  var controller = '';

  switch (type) {
    case 'signup':
      controller = 'signup/signup';
      break;
    case 'lostPassword':
      controller = 'login/lostPassword';
    default:
    break;

  }

  $.nav.openWindow(Alloy.createController(controller, e).getView());

}

/**
 * connect - connection function
 *
 * @param  {object} e
 */
function connect(e){

    var password = $.password.getValue();
    var login = $.login.getValue();

    if(!require('core').valideEmail(login)){
      Ti.UI.createAlertDialog({
        title : 'Attention',
        message : 'Merci de saisir un email valide'
      }).show();
      return false;
    }
    
    if(password && login){

      /*Alloy.Globals.loading.show(L("loading"));
      //WS LOGIN
      var obj = {
        email : $.login.value,
        password : $.password.value
      };

      Alloy.Globals.Api.signin({body:obj},function(e){

      });*/
      Ti.App.Properties.setBool('isConnected', true);
      Alloy.createController('dashboard').getView();

    }

}


/**
 * next - focus next field
 *
 * @param  {object} e field
 */
function next(e){

  if($[e.source.next])
    $[e.source.next].focus();

}
