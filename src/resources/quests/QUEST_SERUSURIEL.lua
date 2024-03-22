QUEST_SERUSURIEL = {
	title = 'IDS_PROPQUEST_INC_001731',
	character = 'MaFl_DrEstly',
	end_character = 'MaFl_DrEstly',
	start_requirements = {
		min_level = 20,
		max_level = 35,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_PHANTASM',
	},
	rewards = {
		gold = 0,
		exp = 3114,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_KEYPIECE', quantity = 5, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001732',
			'IDS_PROPQUEST_INC_001733',
			'IDS_PROPQUEST_INC_001734',
			'IDS_PROPQUEST_INC_001735',
			'IDS_PROPQUEST_INC_001736',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001737',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001738',
		},
		completed = {
			'IDS_PROPQUEST_INC_001739',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001740',
		},
	}
}
