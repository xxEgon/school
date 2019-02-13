#include <iostream>
#include <stack>
using namespace std;

int main () {
	
	int ilosc = 0;
	cin>> ilosc;
	int il_znakow = 0;

	stack<string> stos;
	string wyr_final = "";
	
	for(int i =0; i< ilosc; i++ ) {
		cin>> il_znakow;
		string wyr [il_znakow];
		string oper [il_znakow];
		int licz_op = 0;
		int licz_wyr = 0;
		
		string p = "";
		for(int k= 0;k< 3;k++){
			cin >> p;
			licz_wyr++;	
			if(k == 0 && p == " ")
				break; 
			for(int m = 0; m < p.length(); m++)
				if(p[m] == '*' || p[m] == '/' ||p[m] == '+' ||p[m] == '-' ||p[m] == '%') {
					oper[licz_op] = p[m];
					//cout<< "op: "<<oper[licz_op] <<endl;
					licz_op++;	
					p.erase(m, 1);		
					m--;		
				}
			wyr[k] = p;
		}

		licz_wyr+= licz_op;
		//cout<<"LICZ_WYR:"<<licz_wyr<<endl;
		for(int k=licz_wyr - licz_op, m=0;k< licz_wyr;k++, m++) {
			wyr[k]= oper[m];
		}
		
		string wyr_onp = "";
		string pom = " ";
		string jed = "";
		
		for(int j = 0 ; j< licz_wyr ; j++) {
			//cout<<"switch:"<<wyr[j][0]<<endl;
			switch(wyr[j][0])                                
		    {                      
			case '*' : 
			case '/' : 
			case '+' :                          
			case '-' : 
			case '%' : 
				//cout<<"OPERATOR"<<endl;
				//cout<<"x:"<<stos.top()<<endl;
				//cout<<"a1"<<endl;
				pom = stos.top();
				stos.pop();
				jed="";
				if(j!=licz_wyr-1)
					jed+="(";
				jed+= stos.top();
				stos.pop();
				jed+= wyr[j];
				jed+= pom;
				if(j!=licz_wyr-1)
					jed+=")";
				if(j==licz_wyr-1)
					wyr_onp = jed;
				//cout<<"a:"<<jed<<endl;
				stos.push(jed);		
				break;
			case ' ':
				break;
			default:  
				stos.push(wyr[j]);	
				//cout<<"c:"<<stos.top()<<endl;					        
			    break;
		    }
		}
		while(stos.size() > 0) {
			stos.pop(); 
		}
		wyr_final+= wyr_onp;
		wyr_final+= "\n";		
	}	
	cout<<endl <<wyr_final<<endl;
	
	system("pause");
	return 0;	
}

