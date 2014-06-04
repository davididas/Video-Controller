

Videos = new Meteor.Collection("videos");


var videoDefaults = {
	token: "",
	playState: "stop",
	mute: false
};


/**
 * CLIENT
 */
if (Meteor.isClient)
{
	var token = window.location.href.split('#')[1];
	Session.set("vid", localStorage.getItem("vid") );	
	
	Meteor.startup(function () {
		
		if(!Session.get("vid")) {
			
    	var token = Math.floor(Math.random()*90000) + 10000;
			var video = _.extend(videoDefaults, {token:token});
			var vid = Videos.insert(video);
			
			localStorage.setItem("vid", vid);
			Session.set("vid", vid);
		}

  });
	
	
	

	Template.video_remote.isRemote = function() {
		return !!window.location.hash; 
	};
	
	Template.remote.playState = function() {
		var video = Videos.findOne({token:+token});
		return  video ? video.playState : "";
	}
	
	Template.remote.muteState = function() {
		var video = Videos.findOne({token:+token});
		return  video ? video.muteState : "";
	}
	
	Template.remote.events({
		'click input.pause': function() {
			var _id = Videos.findOne({token:+token})._id;
			Videos.update({_id:_id}, {$set:{playState:'paused'}});
		},
		'click input.play': function() {
			var _id = Videos.findOne({token:+token})._id;
			Videos.update({_id:_id}, {$set:{playState:'playing'}});
		},
		'click input.mute': function() {
			
		},
		'click input.unmute': function() {
			
		}
	});
	
	
	
	Template.video.url = function() {
		return document.URL;
	};
	
  Template.video.video = function () {
    return Videos.findOne({ _id: Session.get("vid") });
  };

  Template.video.events({
    'click input': function () {
        console.log( "hello, ", localStorage.getItem("cid") );
    }
  });
    
}




/**
 * SERVER
 */
if (Meteor.isServer)
{
	
  Meteor.startup(function () {
    // code to run on server at startup
  });
	
	Meteor.onConnection(function(conn) {
		//var cid = Math.floor(Math.random()*90000) + 10000;
		//Controllers.insert({cid:cid});
		conn.onClose(function() {
			//Controllers.remove({cid:cid});
		});
	});
	
	Meteor.methods({
		pauseVideo: function(funcName) {
			
		}
	});
}
