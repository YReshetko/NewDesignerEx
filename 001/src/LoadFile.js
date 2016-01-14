/**
 * Created with IntelliJ IDEA.
 * User: Yurchik
 * Date: 05.01.16
 * Time: 0:06
 * To change this template use File | Settings | File Templates.
 */
var target;
function init(){
	target = document.getElementById("your-files");
	mainWrapper = document.getElementById("main-wrapper");
	target.addEventListener("dragover", function(event) {
		event.preventDefault(); // ???????? ???????? ?? ?????????
		$(target).addClass("your-files1");
	}, false);
	target.ondragleave = function(event){
		event.preventDefault();
		$(target).removeClass("your-files1");
	}
	mainWrapper.addEventListener("dragover", function(event) {
		event.preventDefault(); // ???????? ???????? ?? ?????????
	}, false);
	mainWrapper.addEventListener("drop", function(event) {
		event.preventDefault(); // ???????? ???????? ?? ?????????
	}, false);
	target.addEventListener("drop", function(event) {
		// ???????? ???????? ?? ?????????
		event.preventDefault();
		$(target).removeClass("your-files1");
		var i = 0,
			files = event.dataTransfer.files,
			len = files.length;
		for (; i < len; i++) {
			console.log("Filename: " + files[i].name);
			console.log("Type: " + files[i].type);
			console.log("Size: " + files[i].size + " bytes");
			getAsText(files[i]);
		}
	}, false);
}

function getAsText(readFile) {

	var reader = new FileReader();

	// Read file into memory as UTF-16
	reader.readAsText(readFile, "UTF-8");

	// Handle progress, success, and errors
	reader.onprogress = updateProgress;
	reader.onload = loaded;
	reader.onerror = errorHandler;
}

function updateProgress(evt) {
	if (evt.lengthComputable) {
		// evt.loaded and evt.total are ProgressEvent properties
		var loaded = (evt.loaded / evt.total);
		if (loaded < 1) {
			// Increase the prog bar length
			// style.width = (loaded * 200) + "px";
		}
	}
}

function loaded(evt) {
	// Obtain the read file data
	var fileString = evt.target.result;
	// Handle UTF-16 file dump
	console.log(fileString);
	// xhr.send(fileString)
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		// The file could not be read
	}
}
