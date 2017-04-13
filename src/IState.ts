
export default IState;

interface IState {
    create?: () => void,
    preload?: () => void;
}