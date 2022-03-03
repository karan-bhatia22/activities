function waterTrap(height){

    if(height.length === 0) return 0;  // since no buildings present hence water trapped will be 0

    let size = height.length; // length of the height array
    let max_l = Array(size); // declaring array that contains maximum to the left for each building
    let max_r = Array(size); // array that contains maximum to the right for each building
    max_l[0] = height[0]; // setting max to the left for first building
    max_r[size - 1] = height[size - 1]; // setting max to the right for the last building

    // populating maximum values to left for all buildings
    for(let i = 1; i < size; i ++){
        max_l[i] = Math.max(max_l[i - 1], height[i]);
    }
    
    // populating maximum values to left for all buildings
    for(let i = size - 2; i >= 0; i -= 1){
        max_r[i] = Math.max(max_r[i + 1], height[i]);
    }

    let total_water_trapped = 0; // total water trapped variable with local scope
    for(let i = 0; i < size; i ++){
        total_water_trapped += Math.min(max_l[i], max_r[i]) - height[i];
    }

    return total_water_trapped;
}

const arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
const total_water_trapped = waterTrap(arr);

console.log(total_water_trapped);
