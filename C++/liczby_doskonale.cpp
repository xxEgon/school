#include <iostream>
using namespace std;

bool czy_dosk(int);

int main(){
    int x= 0;
    cout<<"Podaj liczbe naturalna do sprawdzenia"<<endl;
    cin>> x;
	
	if(x >5 && czy_dosk(x))
		cout<<x <<" jest liczba doskonala"<< endl;	
	else
		cout<<x <<" nie jest liczba doskonala"<< endl;	
	
	system("pause");
	return 0;
}

bool czy_dosk(int x) 
{ 	
	int i= 1, k= 0, m= 0;
	m= x;
	
	do{
		if(x% i== 0)
			k+= i;	
		i++;
	}while(i!= x);
	
	if(m== k)
		return true;
	return false;
}

