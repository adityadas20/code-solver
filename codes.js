module.exports = {
    answers: [
        `#include <bits/stdc++.h>
         using namespace std;

         int main(){
            int n;
            cin>>n;
            vector<int> arr(n);
            int sum=0;

            for(int i=0;i<n;i++){
                cin>>arr[i];
                sum+=arr[i];
            }
            cout<<sum<<endl;
            return 0;
         }
        `,
        `#include <bits/stdc++.h>
         using namespace std;

         int main(){
            int n;
            cin>>n;
            vector<int> arr(n);
            int sum=0;

            for(int i=0;i<n;i++){
                cin>>arr[i];
                sum+=arr[i];
            }
            cout<<(sum%2==0)<<endl;
            return 0;
         }
        `
    ]
}