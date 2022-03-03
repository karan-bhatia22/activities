#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int waterTrap(vector<int> arr)
{    
    // total water trapped is the sum of water above each building
    // water above each building = min(max_l, max_r) - height[i]  for any building at index i. max_l is max height of any building to the left
    // and max_r is max height of any building to the right
    if(arr.empty()) return 0;
    vector<int> max_l(arr.size()), max_r(arr.size());
    max_l[0] = arr[0];
    max_r[arr.size() - 1] = arr[arr.size() - 1];

    int i;
    for(i = 1; i < arr.size(); i ++)
    {
        max_l[i] = max(max_l[i - 1], arr[i]);
    }
    for(i = arr.size() - 2; i > -1; i--)
    {
        max_r[i] = max(max_r[i + 1], arr[i]);
    }

    int total_water_trapped = 0;
    for(i = 0; i < arr.size(); i ++)
    {
        total_water_trapped += min(max_l[i], max_r[i]) - arr[i];
    }
    return total_water_trapped;
}
int main()
{
    // provided with a height array
    int n;
    cin>>n; // number of elements in the array

    vector<int> height;
    int i, t;
    for(i = 0; i < n; i ++)
    {
        cin>>t;
        height.push_back(t);
    }
    
    if(!height.empty())
    {
        int trapped_water = waterTrap(height);
        cout<<trapped_water<<'\n';
    }
    else 
    cout<<"Heights of buildings cannot be empty!\n";
    return 0;
}