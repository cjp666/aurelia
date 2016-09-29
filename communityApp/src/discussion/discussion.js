function getDiscussionInput() {
    return "";
}

function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export class Discussion {
    activate() {
        this.discussionInput = getDiscussionInput();
        this.originalInput = cloneObject(this.discussionInput);
    }

    save() {
        this.originalInput = cloneObject(this.discussionInput);
    }

    canDeactivate() {
        var different = JSON.stringify(this.discussionInput) != JSON.stringify(this.originalInput);

        if (!different) {
            return true;
        }

        if (confirm("Unsaved data, are you sure?")) {
            return true;
        }

        return false;
    }
}
