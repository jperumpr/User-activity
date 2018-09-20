// Tracking Question click
var questions = document.getElementsByClassName('question-hyperlink');
for (var i = 0; i < questions.length; i++) {
    questions[i].addEventListener('click', function() {
        var href = this.getAttribute('href').toString();
        var question_id = href.split('/')[2];
        var question_link = "https://stackoverflow.com/q/" + question_id;
        chrome.extension.sendMessage({"type": "question-hyperlink", "content": question_link, "id": question_id});
    });
}

// Tracking Upvotes on Questions and Answers
if (document.getElementsByClassName('question-page')[0]) {
    var upvote = document.getElementsByClassName('vote-up-off'); //class for upvote
    for (var i = 0; i < upvote.length; i++) {
        upvote[i].addEventListener('click', function() {
            var qn_title = this.getAttribute("title").toString();
            if (qn_title.includes("question")) //check whether the upvote is on a question or answer
            {
                var qn_id = document.getElementsByClassName('question')[0].getAttribute('data-questionid').toString();
                var qn_link = "https://stackoverflow.com/q/" + qn_id;
                chrome.extension.sendMessage({"type": "upvote_off_question", "content": qn_link, "id": qn_id});
            }
            else //upvote on an answer
            {
                var answer_id = this.parentElement.getElementsByTagName('input')[0].getAttribute('value').toString();
                var answer_link = "https://stackoverflow.com/a/" + answer_id;
                chrome.extension.sendMessage({"type": "upvote_off_answer", "content": answer_link, "id": answer_id});
            }
        });
    }
}


//Tracking DownVotes on Questions and Answers
if (document.getElementsByClassName('question-page')[0]) {
    var upvote = document.getElementsByClassName('vote-down-off'); //class for upvote
    for (var i = 0; i < upvote.length; i++) {
        upvote[i].addEventListener('click', function() {
            var qn_title = this.getAttribute("title").toString();
            if (qn_title.includes("question")) //check whether the upvote is on a question or answer
            {
                var qn_id = document.getElementsByClassName('question')[0].getAttribute('data-questionid').toString();
                var qn_link = "https://stackoverflow.com/q/" + qn_id;
                chrome.extension.sendMessage({"type": "downvote_off_question", "content": qn_link, "id": qn_id});
            }
            else //upvote on an answer
            {
                var answer_id = this.parentElement.getElementsByTagName('input')[0].getAttribute('value').toString();
                var answer_link = "https://stackoverflow.com/a/" + answer_id;
                chrome.extension.sendMessage({"type": "downvote_off_answer", "content": answer_link, "id": answer_id});
            }
        });
    }
}



// Tracking the tag clicks
var post_tags = document.getElementsByClassName('post-tag');
for (var i = 0; i < post_tags.length; i++) {
    post_tags[i].addEventListener('click', function() {
        console.log("Inside tag tracking");
        var tag_click1 =  this.getAttribute('href').toString();
        var result_tag=tag_click1.slice(18);
        console.log("tag_click:",result_tag);
        var tag_link = "https://stackoverflow.com" + this.getAttribute('href').toString();
        chrome.extension.sendMessage({"type": "tag_click", "content": result_tag, "id": ""});
    });
}


// Tracking the tag clicks Star Unstar
if (document.getElementsByClassName('question-page')[0]) {
    var stars = document.getElementsByClassName('star-off');
    stars[0].addEventListener('click', function() {
        var qn_id = document.getElementsByClassName('question')[0].getAttribute('data-questionid').toString();
        var qn_url = "https://stackoverflow.com/q/" + qn_id;
        if (document.getElementsByClassName('stars-on')[0]) {
            chrome.extension.sendMessage({"type": "unstar", "content": qn_url, "id": qn_id});
        } else {
            chrome.extension.sendMessage({"type": "star", "content": qn_url, "id": qn_id});
        }
    });
}

// Tracking the Shares
if (document.getElementsByClassName('question-page')[0]) {
    var share = document.getElementsByClassName('short-link');
    for (var i = 0; i < share.length; i++) {
        share[i].addEventListener('click', function() {
            var title = this.getAttribute("title").toString();
            if (title.includes("question")) {
                var question_id = this.getAttribute("href").toString().split('/')[2];
                var question_link = "https://stackoverflow.com/q/" + question_id;
                chrome.extension.sendMessage({"type": "share_question", "content": question_link, "id": question_id});
            } else {
                var answer_id = this.getAttribute("href").toString().split('/')[2];
                var answer_link = "https://stackoverflow.com/a/" + answer_id;
                chrome.extension.sendMessage({"type": "share_answer", "content": answer_link, "id": answer_id});
            }
        });
    }
}


