QUEST_SCENARIO5 = {
	title = 'IDS_PROPQUEST_SCENARIO_INC_000249',
	character = 'MaDa_Adin',
	end_character = 'MaFl_Geron',
	start_requirements = {
		min_level = 15,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_SCENARIO4',
	},
	rewards = {
		gold = 5550000,
		exp = 0,
	},
	end_conditions = {
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_GUARDIEYE', monster_id = 'MI_ELDERGUARD3', probability = '900000000' },
		{ item_id = 'II_SYS_SYS_QUE_AMPERE', monster_id = 'MI_VOLT3', probability = '270000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_SCENARIO_INC_000250',
		},
		begin_yes = nil,
		begin_no = nil,
		completed = nil,
		not_finished = nil,
	}
}
