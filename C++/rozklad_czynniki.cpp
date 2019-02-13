#include <iostream>
using namespace std;

void wypisz_rozklad(int);

int main() 
{
    int x;
    cout<<"Podaj liczbe do rozkladu"<<endl;
    cin>> x;
    
    if(x!= 0)
    	wypisz_rozklad(x);
    else
    	cout<< "Nie mozna rozlozyc"<<endl;
    
    system("pause");
    return 0;
}

void wypisz_rozklad(int x) 
{ 	
	int i= 2;
	
	cout<< "Czynniki: ";
	
	while(x!= 1){
    	if(x% i== 0){
    		cout<<i <<", ";
    		x/= i;
		}
		else
			i++;
	}
	
	cout<< endl;
}


