public class CharCounter{

    protected int count;

    public void processLine(String text) {
        count += text.split("[^\\s\\\\]").length;
    }


    public Object getResult() {
        return count;
    }

    public void reset() {
        count = 0;
    }
}
