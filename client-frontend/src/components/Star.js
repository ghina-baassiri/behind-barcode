import React, {useState} from 'react';

export default function Star() {
    const filledStar = '../../assets/star.png'
    const emptyStar = '../../assets/star_outline.png'
    const [starIcon,setStartIcon] = useState(emptyStar)

    // Handles rating star icon toggle
    const onStarToggle = () => {
        starIcon === emptyStar ? setStartIcon(filledStar) : setStartIcon(emptyStar)
    }

    return (
        <Image source={require(starIcon)} onPress={onStarToggle}/>
    );
}
