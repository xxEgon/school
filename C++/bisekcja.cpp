
#include <iostream>
#include <math.h>
using namespace std;



double f(double x) {
	return pow((x-5), 3)+2;
}

//dziala moje
double bisekcja(double a, double b, double eps) {
	
	if(f((a+b)/2) == 0)
		return (a+b)/2;
		
	double c= f((a+b)/2);
	
	while(fabs(a-b)> eps) {
		
		if(f(c) * f(a) < 0)
			b= c;
		else if(f(c) * f(b) < 0)
			a= c;	
		c= (a+b)/2;		
	}
	return (a+b)/2;
}

//dziala od pana
//double bisekcja(double a, double b, double e) {
//	double x;
//	do{
//		x=(a+b)/2;
//		if((f(a) * f(x))<=0)
//			b=x;
//		else
//			a=x;
//	} while(fabs(a-b) >= e || fabs(f(x)) >= e );
//	return x;
//}

int main() {
	
	double a, b, fa, fb, eps;
	cout<<"Podaj argument 1: "<<endl;
	cin>>a;
	cout<<"Podaj argument 2: "<<endl;
	cin>>b;
	cout<<"Podaj przyblizenie: "<<endl;
	cin>>eps;
	
	fa = f(a); 
	fb = f(b);
	if(fa == 0) 
		cout<< "Miejsce zerowe wynosi: "<< fa<< endl;
	if(fb == 0) 
		cout<< "Miejsce zerowe wynosi: "<< fb<< endl;
	if(fa * fb > 0)
		cout<<"Nie ma miejsca zerowego w tym przedziale"<< endl;
	else {
			cout<< "Miejsce zerowe wynosi: "<< bisekcja(a, b, eps)<< endl;
	}
	

	system("pause");
	return 0;
}

