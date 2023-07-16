export default class ProgressManager {
    static loadProgress() {
        const progress = JSON.parse(localStorage.getItem('progress')) ?? [];
        return progress;
    }

    static saveProgress(progress) {
        localStorage.setItem('progress', JSON.stringify(progress));
    }

    static resetProgress() {
        localStorage.removeItem('progress');
    }
}