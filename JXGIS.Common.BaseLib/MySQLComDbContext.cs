using System.Data;
using SqlCommand = MySql.Data.MySqlClient.MySqlCommand;
using SqlParameter = MySql.Data.MySqlClient.MySqlParameter;
using SqlConnection = MySql.Data.MySqlClient.MySqlConnection;
using SqlDataAdapter = MySql.Data.MySqlClient.MySqlDataAdapter;

namespace JXGIS.Common.BaseLib
{

    public class MySQLComDbContext
    {
        private SqlDataAdapter _DBAdapter = null;
        private string _connectionString = null;
        private SqlConnection _connection = null;

        public MySQLComDbContext()
        {
            this._connectionString = SystemUtils.Config.MySQLDbConStr;
            this._DBAdapter = new SqlDataAdapter();
            this._connection = new SqlConnection(this._connectionString);

        }

        public MySQLComDbContext(string sConnectionString)
        {
            this._connectionString = sConnectionString;
            this._DBAdapter = new SqlDataAdapter();
            this._connection = new SqlConnection(this._connectionString);
        }

        public DataTable GetDataTable(string selectSQL, CommandType commandType, params SqlParameter[] SqlParameters)
        {
            return GetDataSet(selectSQL, commandType, SqlParameters).Tables[0];
        }

        public DataTable GetDataTable(string selectSQL, CommandType commandType, int startRecordNum, int recordCount, params SqlParameter[] SqlParameters)
        {
            return GetDataSet(selectSQL, commandType, startRecordNum, recordCount, SqlParameters).Tables[0];
        }

        public DataSet GetDataSet(string selectSQL, CommandType commandType, params SqlParameter[] SqlParameters)
        {
            this._DBAdapter.SelectCommand = GetSqlCommand(selectSQL, commandType, SqlParameters);
            return FillDataSet();
        }

        public DataSet GetDataSet(string selectSQL, CommandType commandType, int startRecordNum, int recordCount, params SqlParameter[] SqlParameters)
        {
            this._DBAdapter.SelectCommand = GetSqlCommand(selectSQL, commandType, SqlParameters);
            return FillDataSet(startRecordNum, recordCount);
        }

        private SqlCommand GetSqlCommand(string selectSQL, CommandType commandType, params SqlParameter[] SqlParameters)
        {
            SqlCommand command = new SqlCommand(selectSQL, this._connection);
            command.Parameters.AddRange(SqlParameters);
            command.CommandType = commandType;
            return command;
        }

        private DataSet FillDataSet(int startRecordNum, int recordCount)
        {
            DataSet ds = new DataSet();
            this._DBAdapter.Fill(ds, startRecordNum - 1, recordCount, null);
            return ds;
        }

        private DataSet FillDataSet()
        {
            DataSet ds = new DataSet();
            this._DBAdapter.Fill(ds);
            return ds;
        }

        public static MySQLComDbContext Context
        {
            get
            {
                return new MySQLComDbContext();
            }
        }
    }
}
