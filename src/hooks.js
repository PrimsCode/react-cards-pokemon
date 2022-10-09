import {useState, useEffect} from "react";
import axios from "axios";

const useFlip = () => {
    const [isFacingUp, setIsFacingUp] = useState(true);

    const flipCard = () => {
    setIsFacingUp(isUp => !isUp);
    }

    return [isFacingUp, flipCard]
}

const useAxios = (key, url) => {
    const [cards, setCards] = useLocalStorage(key);

    const addCard = async (formatter = data => data, restOfUrl = "") => {
        const res = await axios.get(`${url}${restOfUrl}`);
        setCards(cards => [...cards, formatter(res.data)]);      
    }
    const clearCards = () => setCards([]);

    return [cards, addCard, clearCards];   
}

function useLocalStorage(key, initialValue = []) {
    if (localStorage.getItem(key)) {
      initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
  }
  
  export default useLocalStorage;
  
  export { useFlip, useAxios, useLocalStorage };