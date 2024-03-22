QUEST_TUTORIAL06 = {
	title = 'IDS_PROPQUEST_INC_002239',
	character = 'MaFl_Luda',
	end_character = 'MaFl_Luda',
	start_requirements = {
		min_level = 1,
		max_level = 5,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_TUTORIAL05',
	},
	rewards = {
		gold = 10000,
		exp = 22,
	},
	end_conditions = {
		monsters = {
			{ id = 'MI_MUSHPANG1', quantity = 15 },
			{ id = 'MI_MUSHPANG2', quantity = 15 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002240',
			'IDS_PROPQUEST_INC_002241',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002242',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002243',
		},
		completed = {
			'IDS_PROPQUEST_INC_002244',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002245',
		},
	}
}
