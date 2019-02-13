#include <iostream>
using namespace std;

bool czy_pierw(int);

int main() 
{
    int x;
    cout<<"Podaj liczbe naturalna do sprawdzenia"<<endl;
    cin>>x;
    if(x>1 && czy_pierw(x))
	    cout<<x<<" jest liczba pierwsza"<<endl;
	else 
		cout<<x<<" nie jest liczba pierwsza"<<endl;
    
    system("pause");
    return 0;
}

bool czy_pierw(int x) 
{ 	
	int i=2;
	while(i*i <= x){
		if(x% i== 0)
			return false;
		return true;
	}
}

