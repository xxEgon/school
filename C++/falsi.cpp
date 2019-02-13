
#include <iostream>
#include <math.h>
using namespace std;



double f(double x) {
	return pow((x-5), 3)+2;
}

double falsi(double a, double b, double e) {
	double x, y;
	do {
		y= x;
		x=a-(f(a)*((b - a)/(f(b)-f(a))));
		if((f(a) * f(x))<=0)
			b=x;
		else
			a=x;
	} while(fabs(x-y) >= e);
	return x;
}

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
			cout<< "Miejsce zerowe wynosi: "<< falsi(a, b, eps)<< endl;
	}
	
	system("pause");
	return 0;
}

