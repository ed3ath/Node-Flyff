QUEST_2013 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000144',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 23,
		max_level = 26,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 11500,
		exp = 2185,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_OFFICEDOC', quantity = 20, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000145',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000146',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000147',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000148',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000149',
		},
	}
}
