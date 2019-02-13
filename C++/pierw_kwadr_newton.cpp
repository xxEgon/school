#include <iostream>
#include <math.h>
using namespace std;


int main(){
 	
 	double a, p;
 	double eps= 0.01;
 	
 	cout<<"Podaj liczbe do spierwiastkowania"<<endl;
 	cin>> a;
 	
 	p =a/2;
 	
 	while(fabs(a/p-p)>eps){			
	  	p= (a/p+p)/2; 	
	}

 	
 	cout<<"Wynik to: "<<p << endl; 	
	system("pause");
	return 0;
}





