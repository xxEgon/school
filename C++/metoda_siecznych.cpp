
#include <iostream>
#include <math.h>
using namespace std;



double f(double x) {
	//return pow((x-5), 3)+2;
	//return pow(x, 3) + x - 3;
	return cos(x) + 1/(x+2);
}

double sieczne(double a, double b, double e) {
	double x, y;
	int licznik= 0;
	do {
		y= x;
		x=a-(f(a)*((b - a)/(f(b)-f(a))));
		b=a;
		a=x;
		licznik++;
	} while(fabs(x-y) >= e && licznik < 100);
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
			cout<< "Miejsce zerowe wynosi: "<< sieczne(a, b, eps)<< endl;
	}
	
	system("pause");
	return 0;
}

